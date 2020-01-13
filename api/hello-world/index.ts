import { NowRequest, NowResponse } from '@now/node'

export default async function(_: NowRequest, res: NowResponse) {
  res.send('hello, world')
}
