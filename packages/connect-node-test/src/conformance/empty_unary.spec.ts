// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createCallbackClient, createPromiseClient } from "@connectrpc/connect";
import { TestService } from "../gen/connectrpc/conformance/v1/test_connect.js";
import { Empty } from "@bufbuild/protobuf";
import { createTestServers } from "../helpers/testserver.js";

describe("empty_unary", function () {
  const servers = createTestServers();
  beforeAll(async () => await servers.start());

  servers.describeTransports((transport) => {
    const empty = new Empty();
    it("with promise client", async function () {
      const client = createPromiseClient(TestService, transport());
      const response = await client.emptyCall(empty);
      expect(response).toEqual(empty);
    });
    it("with callback client", function (done) {
      const client = createCallbackClient(TestService, transport());
      client.emptyCall(empty, (err, response) => {
        expect(err).toBeUndefined();
        expect(response).toEqual(empty);
        done();
      });
    });
  });

  afterAll(async () => await servers.stop());
});