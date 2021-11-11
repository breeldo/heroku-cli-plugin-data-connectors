import {expect, test} from '@oclif/test'

const addon = 'postgres-happy-1234'

describe('data:enhanced-certificates:disable', () => {
  describe('disabling enhanced certificates', () => {
    test
    .nock('https://postgres-api.heroku.com', api => {
      api
      .put(`/client/v11/enhanced_certificates/${addon}/disable`)
      .reply(200, '')
    })
    .stderr()
    .command(['data:enhanced-certificates:disable', addon])
    .it('works', ctx => {
      expect(ctx.stderr).to.include('Disabling Enhanced Certificates Beta')
    })
  })
})
