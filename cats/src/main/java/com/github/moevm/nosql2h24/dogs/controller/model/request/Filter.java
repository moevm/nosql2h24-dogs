package com.github.moevm.nosql2h24.dogs.controller.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@Data
public class Filter {
    @JsonProperty("part_name")
    private String partName;
    @JsonProperty("filter_number")
    private List<FilterNumber> filterNumber;
    @JsonProperty("filter_bigger_number")
    private List<FilterNumber> filterBiggerNumber;
    @JsonProperty("filter_temperament")
    private List<IdValue> filterTemperament;
    @JsonProperty("filter_country")
    private List<IdValue> filterCountry;
    @JsonProperty("filter_countryCodes")
    private List<IdValue> filterCountryCodes;

    @Setter
    @Getter
    public static class FilterNumber {
        private String id;
        private String value;
        private int from;
        private int to;
    }
    @Setter
    @Getter
    public static class IdValue {
        private String id;
        private String value;

    }
}