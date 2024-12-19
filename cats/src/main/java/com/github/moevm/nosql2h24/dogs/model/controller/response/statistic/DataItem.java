package com.github.moevm.nosql2h24.dogs.model.controller.response.statistic;

import java.util.Comparator;

public record DataItem(String name, double value) {

    public static Comparator<DataItem> byValue() {
        return Comparator.comparingDouble(DataItem::value);
    }
}
