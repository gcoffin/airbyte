/*
 * Copyright (c) 2021 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.integrations.base;

import com.fasterxml.jackson.databind.JsonNode;
import io.airbyte.commons.json.Jsons;
import io.airbyte.protocol.models.AirbyteErrorTraceMessage.FailureType;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class AirbyteTraceMessageUtilityTest {

  PrintStream originalOut = System.out;
  private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();

  @BeforeEach
  public void setUpOut() {
    System.setOut(new PrintStream(outContent, true, StandardCharsets.UTF_8));
  }

  private void assertJsonNodeIsTraceMessage(JsonNode jsonNode) {
    // todo: this check could be better by actually trying to convert the JsonNode to an
    // AirbyteTraceMessage instance
    Assertions.assertEquals("TRACE", jsonNode.get("type").asText());
    Assertions.assertNotNull(jsonNode.get("trace"));
  }

  @Test
  void testEmitSystemErrorTrace() {
    AirbyteTraceMessageUtility.emitSystemErrorTrace(Mockito.mock(RuntimeException.class), "this is a system error");
    assertJsonNodeIsTraceMessage(Jsons.deserialize(outContent.toString(StandardCharsets.UTF_8)));
  }

  @Test
  void testEmitConfigErrorTrace() {
    AirbyteTraceMessageUtility.emitConfigErrorTrace(Mockito.mock(RuntimeException.class), "this is a config error");
    assertJsonNodeIsTraceMessage(Jsons.deserialize(outContent.toString(StandardCharsets.UTF_8)));
  }

  @Test
  void testEmitErrorTrace() {
    AirbyteTraceMessageUtility.emitErrorTrace(Mockito.mock(RuntimeException.class), "this is an error", FailureType.SYSTEM_ERROR);
    assertJsonNodeIsTraceMessage(Jsons.deserialize(outContent.toString(StandardCharsets.UTF_8)));
  }

  @AfterEach
  public void revertOut() {
    System.setOut(originalOut);
  }

}
