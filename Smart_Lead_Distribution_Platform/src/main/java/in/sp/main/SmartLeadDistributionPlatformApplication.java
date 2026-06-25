package in.sp.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartLeadDistributionPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartLeadDistributionPlatformApplication.class, args);
	}

}
