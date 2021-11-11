import {expect, test} from '@oclif/test'

const addon = 'postgres-happy-1234'

describe('data:enhanced-certificates:enable', () => {
  describe('enabling enhanced certificates', () => {
    test
    .nock('https://postgres-api.heroku.com', api => {
      api
      .put(`/client/v11/enhanced_certificates/${addon}/enable`)
      .reply(200, '')
    })
    .stderr()
    .command(['data:enhanced-certificates:enable', addon])
    .it('works', ctx => {
      expect(ctx.stderr).to.include('Enabling Enhanced Certificates Beta')
    })
  })
})
