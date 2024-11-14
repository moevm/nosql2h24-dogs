package com.github.moevm.nosql2h24.dogs.service;

import com.github.moevm.nosql2h24.dogs.model.controller.request.Filter;
import org.springframework.stereotype.Service;

@Service
public class FilterBreedService {
    public Integer findMinValueByName(Filter filter, String propertyName) {
        return filter.getFilterNumber() == null ? null : filter.getFilterNumber().stream().filter(v -> v.getValue().equals(propertyName)).map(Filter.FilterNumber::getFrom).findFirst().orElse(null);
    }

    public Integer findMaxValueByName(Filter filter, String propertyName) {
        return filter.getFilterNumber() == null ? null : filter.getFilterNumber().stream().filter(v -> v.getValue().equals(propertyName)).map(Filter.FilterNumber::getTo).findFirst().orElse(null);
    }

    public Integer findMinBigValueByName(Filter filter, String propertyName) {
        return filter.getFilterBiggerNumber() == null ? null : filter.getFilterBiggerNumber().stream().filter(v -> v.getValue().equals(propertyName)).map(Filter.FilterNumber::getFrom).findFirst().orElse(null);
    }

    public Integer findMaxBigValueByName(Filter filter, String propertyName) {
        return filter.getFilterBiggerNumber() == null ? null : filter.getFilterBiggerNumber().stream().filter(v -> v.getValue().equals(propertyName)).map(Filter.FilterNumber::getTo).findFirst().orElse(null);
    }
}
