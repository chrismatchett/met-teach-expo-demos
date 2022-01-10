https://www.npmjs.com/package/react-native-paho-mqtt
http://www.steves-internet-guide.com/understanding-mqtt-topics/

[
  {
    "definition": null,
    "endpoints": {
      "1": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "2": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "3": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "4": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "5": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "6": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "8": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "10": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "11": {
        "bindings": [],
        "clusters": {
          "input": [
            "ssIasAce"
          ],
          "output": [
            "ssIasZone",
            "ssIasWd"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "12": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "13": {
        "bindings": [],
        "clusters": {
          "input": [
            "genOta"
          ],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "47": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "110": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "242": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "Coordinator",
    "ieee_address": "0x00124b0024c9ec84",
    "interview_completed": true,
    "interviewing": false,
    "network_address": 0,
    "supported": false,
    "type": "Coordinator"
  },
  {
    "date_code": "20201012",
    "definition": {
      "description": "Hue white A60 bulb B22 bluetooth",
      "exposes": [
        {
          "features": [
            {
              "access": 7,
              "description": "On/off state of this light",
              "name": "state",
              "property": "state",
              "type": "binary",
              "value_off": "OFF",
              "value_on": "ON",
              "value_toggle": "TOGGLE"
            },
            {
              "access": 7,
              "description": "Brightness of this light",
              "name": "brightness",
              "property": "brightness",
              "type": "numeric",
              "value_max": 254,
              "value_min": 0
            }
          ],
          "type": "light"
        },
        {
          "access": 2,
          "description": "Triggers an effect on the light (e.g. make light blink for a few seconds)",
          "name": "effect",
          "property": "effect",
          "type": "enum",
          "values": [
            "blink",
            "breathe",
            "okay",
            "channel_change",
            "finish_effect",
            "stop_effect"
          ]
        },
        {
          "access": 1,
          "description": "Link quality (signal strength)",
          "name": "linkquality",
          "property": "linkquality",
          "type": "numeric",
          "unit": "lqi",
          "value_max": 255,
          "value_min": 0
        }
      ],
      "model": "9290018217",
      "options": [
        {
          "access": 2,
          "description": "Controls the transition time (in seconds) of on/off, brightness, color temperature (if applicable) and color (if applicable) changes. Defaults to `0` (no transition).",
          "name": "transition",
          "property": "transition",
          "type": "numeric",
          "value_min": 0
        }
      ],
      "supports_ota": true,
      "vendor": "Philips"
    },
    "endpoints": {
      "11": {
        "bindings": [],
        "clusters": {
          "input": [
            "genBasic",
            "genIdentify",
            "genGroups",
            "genScenes",
            "genOnOff",
            "genLevelCtrl",
            "touchlink",
            "manuSpecificSamsungAccelerometer"
          ],
          "output": [
            "genOta"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "242": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": [
            "greenPower"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "0x001788010b2efdb0",
    "ieee_address": "0x001788010b2efdb0",
    "interview_completed": true,
    "interviewing": false,
    "manufacturer": "Signify Netherlands B.V.",
    "model_id": "LWA012",
    "network_address": 32320,
    "power_source": "Mains (single phase)",
    "software_build_id": "1.76.10",
    "supported": true,
    "type": "Router"
  }
]