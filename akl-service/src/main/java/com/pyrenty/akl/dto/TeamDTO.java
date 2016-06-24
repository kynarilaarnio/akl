package com.pyrenty.akl.dto;

import com.pyrenty.akl.domain.enumeration.Rank;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class TeamDto {
    private Long id;
    private String tag;
    private String name;
    private String representing;
    private String imageUrl;
    private Rank rank;
    private String description;
    private Boolean activated;
    private UserPublicDto captain;
    private Set<UserPublicDto> members = new HashSet<>();
    private Set<UserPublicDto> standins = new HashSet<>();
}
