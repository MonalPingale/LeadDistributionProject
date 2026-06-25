package in.sp.main.dto;


import in.sp.main.entity.Role;
import in.sp.main.entity.ServiceType;
import lombok.Data;

@Data
public class RegisterRequest {

    private String username;
    private String email;
    private String password;

    private Role role;

    private ServiceType serviceType;
}