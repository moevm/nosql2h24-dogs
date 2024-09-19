package com.github.moevm.nosql2h24_dogs;

import com.github.moevm.nosql2h24_dogs.database.document.MyDocument;
import com.github.moevm.nosql2h24_dogs.service.MyService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Nosql2h24DogsApplication {

    public static void main(String[] args) {
        var app = SpringApplication.run(Nosql2h24DogsApplication.class, args);

        MyService service = app.getBean(MyService.class);
        //service.deleteDocuments();
        service.saveDocument(new MyDocument("foo", 10));
        service.saveDocument(new MyDocument("bar", 5));
        service.saveDocument(new MyDocument("baz", 3));

        service.countDocuments();
        service.findAllDocuments();
        service.findDocumentsByScoreGreaterThan(5);

    }

}
