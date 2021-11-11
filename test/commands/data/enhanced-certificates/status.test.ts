import {expect, test} from '@oclif/test'

const addon = 'postgres-happy-1234'

const status = {
  status: 'Disabled',
}

describe('data:enhanced-certificates:status', () => {
  describe('enhanced certificates is not enabled', () => {
    test
    .nock('https://postgres-api.heroku.com', api => {
      api
      .get(`/client/v11/enhanced_certificates/${addon}/status`)
      .reply(200, status)
    })
    .stdout()
    .command(['data:enhanced-certificates:status', addon])
    .it('is disabled', ctx => {
      expect(ctx.stdout).to.include('Enhanced Certificates for postgres-happy-1234')
    })
  })

  describe('with --json flag', () => {
    test
    .nock('https://postgres-api.heroku.com', api => {
      api
      .get(`/client/v11/enhanced_certificates/${addon}/status`)
      .reply(200, status)
    })
    .stdout()
    .command(['data:enhanced-certificates:status', addon, '--json'])
    .it('returns the correct JSON output', ctx => {
      expect(JSON.parse(ctx.stdout)).to.deep.equal({status: 'Disabled'})
    })
  })
})
