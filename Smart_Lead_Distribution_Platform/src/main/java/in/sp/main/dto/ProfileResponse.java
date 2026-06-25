package in.sp.main.dto;

import in.sp.main.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private Long id;
    private String username;
    private String email;
    private Role role;
}
