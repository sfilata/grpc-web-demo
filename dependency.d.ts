class EchoServiceClient {
  constructor(url: string) {}
  echo: (
    request: EchoRequest,
    option: Object,
    callback: (err: unknown, res: { getMessage: () => string; getName: () => string }) => void
  ) => void;
}

class EchoRequest {
  constructor() {}
  setMessage: (message: string) => void;
}
export const EchoRequest: EchoRequest;
export const EchoServiceClient: EchoServiceClient;
