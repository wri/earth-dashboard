import axios from "axios";

export const fetchTopicData = () =>
  new Promise((resolve, reject) => {
    resolve({
      biodiversity: {
        topicPage: {
          data: [
            {
              type: "widget",
              id: "0eb9d296-27a7-486e-ab37-8dc01d5cbb94"
            },
            {
              type: "widget",
              id: "6d31da71-1fbb-493b-b385-0625123443b7"
            },
            {
              type: "widget",
              id: "478a1818-39ca-42ad-bbe7-9a32684867e0"
            },
            {
              type: "widget",
              id: "347d0008-e0f6-4996-a624-84863e404568"
            },
            {
              type: "topic-news",
              keywords: ["forests"],
              numberOfElements: 3
            }
          ]
        },
        diveIntoTheData: {
          data: [
            {
              id: "bbf9b1b7-d916-4a43-9bb4-1fe12480de46",
              widgetsPerColumn: 2
            },
            {
              id: "77d8f477-a159-443a-b985-6d1bef3e0bb2",
              widgetsPerColumn: 2
            },
            {
              id: "10f1cf67-1ac4-49d5-be1d-cc6794022e10",
              widgetsPerColumn: 2
            },
            {
              id: "0700460b-309f-4bab-9e7f-a018c72677bf",
              widgetsPerColumn: 2
            },
            {
              id: "ba8e27fd-ec1f-4659-81db-1a36b0ab5df0",
              widgetsPerColumn: 1
            },
            {
              id: "f7bc464a-7d09-4a2c-8ba2-fb89ba35ff77",
              widgetsPerColumn: 1
            }
          ]
        }
      },
      forests: {
        topicPage: {
          data: [
            {
              type: "widget",
              id: "0eb9d296-27a7-486e-ab37-8dc01d5cbb94"
            },
            {
              type: "widget",
              id: "6d31da71-1fbb-493b-b385-0625123443b7"
            },
            {
              type: "widget",
              id: "478a1818-39ca-42ad-bbe7-9a32684867e0"
            },
            {
              type: "widget",
              id: "347d0008-e0f6-4996-a624-84863e404568"
            },
            {
              type: "topic-news",
              keywords: ["forests"],
              numberOfElements: 3
            }
          ]
        },
        diveIntoTheData: {
          data: [
            {
              id: "bbf9b1b7-d916-4a43-9bb4-1fe12480de46",
              widgetsPerColumn: 2
            },
            {
              id: "77d8f477-a159-443a-b985-6d1bef3e0bb2",
              widgetsPerColumn: 2
            },
            {
              id: "10f1cf67-1ac4-49d5-be1d-cc6794022e10",
              widgetsPerColumn: 2
            },
            {
              id: "0700460b-309f-4bab-9e7f-a018c72677bf",
              widgetsPerColumn: 2
            },
            {
              id: "ba8e27fd-ec1f-4659-81db-1a36b0ab5df0",
              widgetsPerColumn: 1
            },
            {
              id: "f7bc464a-7d09-4a2c-8ba2-fb89ba35ff77",
              widgetsPerColumn: 1
            }
          ]
        }
      },
      freshwater: {
        topicPage: {
          data: [
            {
              type: "widget",
              id: "4ff58679-559a-4f0c-a5e0-748ed5f4c202"
            },
            {
              type: "widget",
              id: "6661e1a0-eb54-43c4-9ce8-b687f269449d"
            },
            {
              type: "widget",
              id: "c3193d82-46e8-4886-bfe7-673d6d606d66"
            },
            {
              type: "widget",
              id: "793cb9c4-929a-49f9-a331-f630dd6d9863"
            },
            {
              type: "widget",
              id: "37bcc8d9-8b8b-4805-9535-3e0a8aa9a7f8"
            },
            {
              type: "topic-news",
              keywords: ["freshwater"],
              "number-of-elements": 3
            }
          ]
        },
        diveIntoTheData: {
          data: [
            {
              id: "e7d822f5-3039-4593-822a-5b92d7fa72f2",
              widgetsPerColumn: 2
            },
            {
              id: "4a518eab-d031-4353-9699-8e74a93c9ff3",
              widgetsPerColumn: 2
            },
            {
              id: "11036e88-2602-41b0-b97c-013c5440e433",
              widgetsPerColumn: 2
            },
            {
              id: "0444d7d7-02a5-4f65-9a2a-15f9f496d21f",
              widgetsPerColumn: 2
            },
            {
              id: "d59e4404-59ea-4736-8188-c7a1b1447526",
              widgetsPerColumn: 2
            }
          ]
        }
      },
      ocean: {
        topicPage: {
          data: [
            {
              type: "widget",
              id: "4991c93e-b036-4eb7-9143-39d2d34bc685"
            },
            {
              type: "widget",
              id: "1f0d588f-b880-4696-80be-4affa3951b5b"
            },
            {
              type: "widget",
              id: "3b8b1231-4dca-4c03-b264-7cd11a57204a"
            },
            {
              type: "widget",
              id: "b294e361-1f23-49d5-8dc8-48ff274337c3"
            },
            {
              type: "topic-news",
              keywords: ["oceans"],
              "number-of-elements": 3
            }
          ]
        },
        diveIntoTheData: {
          data: [
            {
              id: "37fffec7-df6b-407f-8c1b-a2c53c5fad7c",
              widgetsPerColumn: 2
            },
            {
              id: "13850e42-8391-412b-bb09-17750b8a00f0",
              widgetsPerColumn: 2
            },
            {
              id: "e1333165-ba2c-4d14-8678-2c18feeefd4c",
              widgetsPerColumn: 2
            },
            {
              id: "fa32cab6-6edb-48eb-9c95-972293d85ea7",
              widgetsPerColumn: 2
            },
            {
              id: "08930633-b94b-4983-9cd3-6e46ce1e8ad4",
              widgetsPerColumn: 2
            },
            {
              id: "3d9a223b-51f9-4e80-b110-5426cfabf452",
              widgetsPerColumn: 2
            },
            {
              id: "629e8e4d-e517-45c2-8b9b-26fbcca4fccf",
              widgetsPerColumn: 2
            }
          ]
        }
      },
      climate: {
        topicPage: {
          data: [
            {
              type: "widget",
              id: "3bd6cb63-b9da-487c-915e-1ec8b41a1f4f"
            },
            {
              type: "widget",
              id: "4ccd8d00-a11e-46ae-b788-13214f34abe9"
            },
            {
              type: "widget",
              id: "cf08693c-9ddb-40dd-9619-67baa4c95b70"
            },
            {
              type: "widget",
              id: "8d2f2f4f-576b-405f-b3a3-9ba5c4451ca0"
            },
            {
              type: "topic-news",
              keywords: ["climate"],
              "number-of-elements": 3
            }
          ]
        },
        diveIntoTheData: {
          data: [
            {
              id: "ff311f21-05d1-4f62-a203-80146e278426",
              widgetsPerColumn: 2
            },
            {
              id: "2010d0d6-6203-4482-909f-188e572e4c8f",
              widgetsPerColumn: 2
            },
            {
              id: "4945c48c-0c73-4b83-a523-8506988f3517",
              widgetsPerColumn: 2
            },
            {
              id: "a6cb87b6-97a6-41bf-9017-e69c1a28b63f",
              widgetsPerColumn: 2
            },
            {
              id: "826e24ed-ec3f-4257-8fef-f75f5d224aee",
              widgetsPerColumn: 2
            },
            {
              id: "89940a74-909a-4981-a84a-9987f669fb32",
              widgetsPerColumn: 2
            }
          ]
        }
      }
    });
    axios
      .get("/static/data/TopicPagesData.json")
      .then(response => resolve(response.data))
      .catch(error => reject(new Error("There was an error loading the Topics data", error)));
  });

export default { fetchTopicData };
