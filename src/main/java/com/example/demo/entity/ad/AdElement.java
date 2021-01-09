package com.example.demo.entity.ad;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ImageElement.class, name = "image"),
        @JsonSubTypes.Type(value = RichTextElement.class, name = "rich_text"),
        @JsonSubTypes.Type(value = YoutubeVideoElement.class, name = "youtube_video")
})
public abstract class AdElement {

    public abstract String markup();

}
