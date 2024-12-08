package com.github.moevm.nosql2h24.dogs.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

@Configuration
@Slf4j
public class WebConfig implements WebMvcConfigurer {
    @Value("${external.resources.path}")
    String externalResourcesPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("External resources path: {}", externalResourcesPath);
        if (externalResourcesPath != null) {
            registry.addResourceHandler("/images/**").addResourceLocations("file:" + externalResourcesPath);
        } else {
            log.error("External resources path not set. External resources will not be served.");
        }
    }

    @Bean
    public ResourceHttpRequestHandler staticResourcesHandler() {
        return new ResourceHttpRequestHandler();
    }
}