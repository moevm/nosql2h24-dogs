package com.github.moevm.nosql2h24.dogs.controller;

import com.github.moevm.nosql2h24.dogs.database.document.Breed;
import com.github.moevm.nosql2h24.dogs.database.document.Event;
import com.github.moevm.nosql2h24.dogs.database.document.User;
import com.github.moevm.nosql2h24.dogs.database.repository.BreedRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.EventRepository;
import com.github.moevm.nosql2h24.dogs.database.repository.UserRepository;
import com.github.moevm.nosql2h24.dogs.model.controller.response.statistic.Data;
import com.github.moevm.nosql2h24.dogs.model.controller.response.statistic.DataItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistic")
@Slf4j
public class StatisticController {

    private final EventRepository eventRepository;
    private final BreedRepository breedRepository;
    private final UserRepository userRepository;

    public StatisticController(EventRepository eventRepository, BreedRepository breedRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.breedRepository = breedRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public Data getStatistic(
            @RequestParam("type") String type,
            @RequestParam(value = "dateFrom", required = false) String dateFrom,
            @RequestParam(value = "dateTo", required = false) String dateTo,
            @RequestParam(value = "ageFrom", required = false) Integer ageFrom,
            @RequestParam(value = "ageTo", required = false) Integer ageTo,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "breeds", required = false) List<String> breeds) {
        Date localDateFrom = dateFrom == null ? null : Date.from(LocalDateTime.parse(dateFrom).atZone(ZoneId.systemDefault()).toInstant());
        Date localDateTo = dateTo == null ? null : Date.from(LocalDateTime.parse(dateTo).atZone(ZoneId.systemDefault()).toInstant());
        StatisticType statisticType;
        try {
            statisticType = StatisticType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid statistic type");
        }

        switch (statisticType) {
            case USER_LIKES_DESC:
                return getUserLikesDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case BREED_LIKES_FAVORITES_DESC:
                return getBreedLikesFavoritesDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case BREED_COMMENTS_DESC:
                return getBreedCommentsDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case BREED_PARAMETERS_DESC:
                return getBreedParametersDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case USER_ACTIVE_DESC:
                return getUserActiveDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case USER_CREATION_DESC:
                return getUserCreationDesc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            case USER_CREATION_ASC:
                return getUserCreationAsc(localDateFrom, localDateTo, ageFrom, ageTo, limit, breeds);
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid statistic type");
        }
    }

    private Data getUserLikesDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<Event> event = eventRepository.findAll();
        List<DataItem> resultList = event.stream().filter(e -> {
            boolean result = (Event.Type.isLike(e.getType())) &&
                    (dateFrom == null || e.getDate().after(dateFrom)) &&
                    (dateTo == null || e.getDate().before(dateTo)) &&
                    (breeds == null || breeds.isEmpty() || breeds.contains(e.getBreedId())) &&
                    (e.getRecipientId() != null);
            if (!result) {
                return false;
            }
            User user = userRepository.findById(e.getRecipientId()).orElse(null);
            if (user == null) {
                return false;
            }
            return (ageFrom == null || user.getAge() >= ageFrom) &&
                    (ageTo == null || user.getAge() <= ageTo);
        }).collect(Collectors.groupingBy(
                Event::getRecipientId, // ключ - пользователь
                Collectors.counting() // значение - количество лайков
        )).entrySet().stream().map(e -> new DataItem(e.getKey(), e.getValue())).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    private Data getBreedLikesFavoritesDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<User> users = userRepository.findAll();
        List<DataItem> resultList = users.stream().filter(user ->
                        (ageFrom == null || user.getAge() >= ageFrom) &&
                                (ageTo == null || user.getAge() <= ageTo)
                ).flatMap(user -> user.getFavorites().stream()).filter(
                        breed -> (breeds == null || breeds.isEmpty() || breeds.contains(breed)))
                .collect(Collectors.groupingBy(
                        e -> e, // ключ - порода
                        Collectors.counting() // значение - количество лайков
                )).entrySet().stream().map(breed -> {
                    String breedName = breedRepository.findById(breed.getKey()).orElseThrow().getName();
                    return new DataItem(breedName, breed.getValue());
                }).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    private Data getBreedCommentsDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<Event> event = eventRepository.findAll();
        List<DataItem> resultList = event.stream().filter(e -> {
            boolean result = (Event.Type.isBreedComment(e.getType())) &&
                    (dateFrom == null || e.getDate().after(dateFrom)) &&
                    (dateTo == null || e.getDate().before(dateTo)) &&
                    (breeds == null || breeds.isEmpty() || breeds.contains(e.getBreedId())) &&
                    (e.getActorId() != null);
            if (!result) {
                return false;
            }
            User user = userRepository.findById(e.getActorId()).orElse(null);
            if (user == null) {
                return false;
            }
            return (ageFrom == null || user.getAge() >= ageFrom) &&
                    (ageTo == null || user.getAge() <= ageTo);
        }).collect(Collectors.groupingBy(
                Event::getBreedName, // ключ - порода
                Collectors.counting() // значение - количество комментариев
        )).entrySet().stream().map(breed -> new DataItem(breed.getKey(), breed.getValue())).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    private Data getBreedParametersDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<User> users = userRepository.findAll();
        List<DataItem> resultList = users.stream().filter(user ->
                        (ageFrom == null || user.getAge() >= ageFrom) &&
                                (ageTo == null || user.getAge() <= ageTo)
                ).flatMap(user -> user.getFavorites().stream()
                        .map(breed -> breedRepository.findById(breed).orElseThrow().getId()))
                .filter(breed -> (breeds == null || breeds.isEmpty() || breeds.contains(breed)))
                .collect(Collectors.groupingBy(
                        e -> e, // ключ - порода
                        Collectors.counting() // значение - количество лайков
                )).entrySet().stream().map(breed -> new DataItem(breed.getKey(), breed.getValue())).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        resultList = calculateAverages(resultList).entrySet().stream()
                .map(е -> new DataItem(е.getKey(), е.getValue())).sorted(DataItem.byValue().reversed()).toList();
        return new Data(resultList);

    }

    private Data getUserActiveDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<Event> events = eventRepository.findAll();
        List<DataItem> resultList = events.stream().filter(e -> {
            boolean result = (Event.Type.isBreedComment(e.getType())) &&
                    (dateFrom == null || e.getDate().after(dateFrom)) &&
                    (dateTo == null || e.getDate().before(dateTo)) &&
                    (breeds == null || breeds.isEmpty() || breeds.contains(e.getBreedId())) &&
                    (e.getActorId() != null);
            if (!result) {
                return false;
            }
            User user = userRepository.findById(e.getActorId()).orElse(null);
            if (user == null) {
                return false;
            }
            return (ageFrom == null || user.getAge() >= ageFrom) &&
                    (ageTo == null || user.getAge() <= ageTo);
        }).collect(Collectors.groupingBy(
                Event::getActorId, // ключ - пользователь
                Collectors.counting() // значение - количество поставленных комментариев
        )).entrySet().stream().map(e -> new DataItem(e.getKey(), e.getValue())).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    private Data getUserCreationDesc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<User> users = userRepository.findAll();
        List<DataItem> resultList = users.stream().filter(user ->
                ((dateFrom == null || user.getCreationDate().after(dateFrom)) &&
                        (dateTo == null || user.getCreationDate().before(dateTo)) &&
                        (ageFrom == null || user.getAge() >= ageFrom) &&
                        (ageTo == null || user.getAge() <= ageTo))
        ).map(user -> new DataItem(user.getName(), user.getCreationDate().getTime())).sorted(DataItem.byValue().reversed()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    private Data getUserCreationAsc(Date dateFrom, Date dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        List<User> users = userRepository.findAll();
        List<DataItem> resultList = users.stream().filter(user ->
                ((dateFrom == null || user.getCreationDate().after(dateFrom)) &&
                        (dateTo == null || user.getCreationDate().before(dateTo)) &&
                        (ageFrom == null || user.getAge() >= ageFrom) &&
                        (ageTo == null || user.getAge() <= ageTo))
        ).map(user -> new DataItem(user.getName(), user.getCreationDate().getTime())).sorted(DataItem.byValue()).toList();
        if (limit != null) {
            resultList = resultList.stream().limit(limit).toList();
        }
        return new Data(resultList);
    }

    // Метод для вычисления средних значений параметров
    private Map<String, Double> calculateAverages(List<DataItem> dataItems) {
        Map<String, List<Double>> breedParameters = new HashMap<>();

        // Здесь вы должны заполнить breedParameters данными о породах
        // Например, если у вас есть метод, который возвращает параметры для породы
        for (DataItem item : dataItems) {
            String breed = item.name();
            // Получаем параметры для данной породы
            Breed breedData = breedRepository.findById(breed).orElseThrow(); // Метод, который возвращает объект Breed по имени породы

            // Добавляем параметры в карту
            breedParameters.computeIfAbsent("weight_min", k -> new ArrayList<>()).add(breedData.getWeightMin() * item.value());
            breedParameters.computeIfAbsent("weight_max", k -> new ArrayList<>()).add(breedData.getWeightMax() * item.value());
            breedParameters.computeIfAbsent("life_span_min", k -> new ArrayList<>()).add(breedData.getLifeSpanMin() * item.value());
            breedParameters.computeIfAbsent("life_span_max", k -> new ArrayList<>()).add(breedData.getLifeSpanMax() * item.value());
            breedParameters.computeIfAbsent("affection_level", k -> new ArrayList<>()).add(breedData.getAffectionLevel() * item.value());
            breedParameters.computeIfAbsent("child_friendly", k -> new ArrayList<>()).add(breedData.getChildFriendly() * item.value());
            breedParameters.computeIfAbsent("dog_friendly", k -> new ArrayList<>()).add(breedData.getDogFriendly() * item.value());
            breedParameters.computeIfAbsent("energy_level", k -> new ArrayList<>()).add(breedData.getEnergyLevel() * item.value());
            breedParameters.computeIfAbsent("grooming", k -> new ArrayList<>()).add(breedData.getGrooming() * item.value());
            breedParameters.computeIfAbsent("health_issues", k -> new ArrayList<>()).add(breedData.getHealthIssues() * item.value());
            breedParameters.computeIfAbsent("intelligence", k -> new ArrayList<>()).add(breedData.getIntelligence() * item.value());
            breedParameters.computeIfAbsent("shedding_level", k -> new ArrayList<>()).add(breedData.getSheddingLevel() * item.value());
            breedParameters.computeIfAbsent("social_needs", k -> new ArrayList<>()).add(breedData.getSocialNeeds() * item.value());
            breedParameters.computeIfAbsent("stranger_friendly", k -> new ArrayList<>()).add(breedData.getStrangerFriendly() * item.value());
            breedParameters.computeIfAbsent("vocalisation", k -> new ArrayList<>()).add(breedData.getVocalisation() * item.value());
            breedParameters.computeIfAbsent("experimental", k -> new ArrayList<>()).add(breedData.getExperimental() * item.value());
            breedParameters.computeIfAbsent("hairless", k -> new ArrayList<>()).add(breedData.getHairless() * item.value());
            breedParameters.computeIfAbsent("natural", k -> new ArrayList<>()).add(breedData.getNatural() * item.value());
            breedParameters.computeIfAbsent("rare", k -> new ArrayList<>()).add(breedData.getRare() * item.value());
            breedParameters.computeIfAbsent("rex", k -> new ArrayList<>()).add(breedData.getRex() * item.value());
            breedParameters.computeIfAbsent("suppressed_tail", k -> new ArrayList<>()).add(breedData.getSuppressedTail() * item.value());
            breedParameters.computeIfAbsent("short_legs", k -> new ArrayList<>()).add(breedData.getShortLegs() * item.value());
            breedParameters.computeIfAbsent("hypoallergenic", k -> new ArrayList<>()).add(breedData.getHypoallergenic() * item.value());
        }
        // Вычисляем средние значения
        Map<String, Double> averages = new HashMap<>();
        for (Map.Entry<String, List<Double>> entry : breedParameters.entrySet()) {
            List<Double> values = entry.getValue();
            double average = values.stream().mapToInt(Double::intValue).average().orElse(0.0);
            averages.put(entry.getKey(), average);
        }

        return averages;
    }

    private enum StatisticType {
        USER_LIKES_DESC,
        BREED_LIKES_FAVORITES_DESC,
        BREED_COMMENTS_DESC,
        BREED_PARAMETERS_DESC,
        USER_ACTIVE_DESC,
        USER_CREATION_DESC,
        USER_CREATION_ASC;
    }
}
