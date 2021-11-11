import {cli} from 'cli-ux'

import BaseCommand from '../../../lib/base'
export default class DataEnhancedCertificatesEnable extends BaseCommand {
  static description = 'Enable enhanced certificates on an Addon\nRead more about this feature at https://devcenter.heroku.com/articles/heroku-data-enhanced-certificates'

  static examples = [
    '$ heroku data:enhanced-certificates:enale happy-postgres-1234 -a example-app',
  ]

  static args = [{name: 'addon'}]

  async run() {
    const {args} = this.parse(DataEnhancedCertificatesEnable)

    cli.action.start(`Enabling Enhanced Certificates Beta on ${args.addon}`)
    try {
      await this.shogun.put(`/client/v11/enhanced_certificates/${args.addon}/enable`,
        {
          ...this.shogun.defaults,
          raw: true,
        })
    } catch (error) {
      cli.error(error)
    }

    cli.action.stop()
  }
}
