package com.pyrenty.akl.domain.twitch;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class Stream {
    private String game;
    private String viewers;
    private Channel channel;
}