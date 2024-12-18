package com.github.moevm.nosql2h24.dogs.controller;

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
import java.util.List;

@RestController
@RequestMapping("/api/statistic")
@Slf4j
public class StatisticController {

    @GetMapping("/")
    public Data getStatistic(
            @RequestParam("type") String type,
            @RequestParam(value = "dateFrom", required = false) String dateFrom,
            @RequestParam(value = "dateTo", required = false) String dateTo,
            @RequestParam(value = "ageFrom", required = false) Integer ageFrom,
            @RequestParam(value = "ageTo", required = false) Integer ageTo,
            @RequestParam(value = "limit", required = false) Integer limit,
            @RequestParam(value = "breeds", required = false) List<String> breeds) {
        LocalDateTime localDateFrom = dateFrom == null ? null : LocalDateTime.parse(dateFrom);
        LocalDateTime localDateTo = dateTo == null ? null : LocalDateTime.parse(dateTo);
        StatisticType statisticType;
        try {
            statisticType = StatisticType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid statistic type");
        }
        limit = limit == null ? 10 : limit;

        switch (statisticType) {
            case USER_LIKES_ASC:
                return getUserLikesAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case BREED_LIKES_FAVORITES_ASC:
                return getBreedLikesFavoritesAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case BREED_COMMENTS_ASC:
                return getBreedCommentsAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case BREED_PARAMETERS_ASC:
                return getBreedParametersAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case USER_ACTIVE_ASC:
                return getUserActiveAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case USER_CREATION_ASC:
                return getUserCreationAsc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            case USER_CREATION_DESC:
                return getUserCreationDesc(dateFrom, dateTo, ageFrom, ageTo, limit, breeds);
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid statistic type");
        }
    }

    private Data getUserLikesAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getBreedLikesFavoritesAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getBreedCommentsAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getBreedParametersAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getUserActiveAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getUserCreationAsc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private Data getUserCreationDesc(String dateFrom, String dateTo, Integer ageFrom, Integer ageTo, Integer limit, List<String> breeds) {
        // Реализация метода
        return new Data(List.of(new DataItem("name1", 1), new DataItem("name2", 2), new DataItem("name3", 3), new DataItem("name4", 4), new DataItem("name5", 5), new DataItem("name6", 6), new DataItem("name7", 7), new DataItem("name8", 8), new DataItem("name9", 10)).stream().limit(limit).toList()); // Замените на реальную логику
    }

    private enum StatisticType {
        USER_LIKES_ASC,
        BREED_LIKES_FAVORITES_ASC,
        BREED_COMMENTS_ASC,
        BREED_PARAMETERS_ASC,
        USER_ACTIVE_ASC,
        USER_CREATION_ASC,
        USER_CREATION_DESC;
    }
}
