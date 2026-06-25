package in.sp.main.dto;

import in.sp.main.entity.ServiceType;
import lombok.Data;

@Data
public class CreateLeadRequest {

    private String customerName;

    private String customerPhone;

    private String customerAddress;

    private ServiceType serviceType;

    private String problemDescription;
}
