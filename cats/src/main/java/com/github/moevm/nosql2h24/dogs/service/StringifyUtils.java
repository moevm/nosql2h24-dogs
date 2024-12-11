package com.github.moevm.nosql2h24.dogs.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class StringifyUtils {
    private StringifyUtils() {

    }
    public static String stringify(Date date) {
        return LocalDate.ofInstant(date.toInstant(), ZoneId.of("UTC")).format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
}
