package com.example.teamsieben.persistence;

import com.example.teamsieben.config.SwaggerFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

// Interface frägt Daten vom Swagger ab

@FeignClient(
        value = "Companies",
        url = "https://hsaa-stock-exchange-service.azurewebsites.net/v1/stocks",
        configuration = SwaggerFeignConfig.class
)
public interface SwaggerFeignClient {

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{isin}",
            consumes = "application/json"
    )
    Map<String, Object> getObject(@PathVariable String isin);
}
