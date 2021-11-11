import {cli} from 'cli-ux'

import BaseCommand from '../../../lib/base'
export default class DataEnhancedCertificatesDisable extends BaseCommand {
  static description = 'Disable enhanced certificates on an Addon\nRead more about this feature at https://devcenter.heroku.com/articles/heroku-data-enhanced-certificates'

  static args = [{name: 'addon'}]

  async run() {
    const {args} = this.parse(DataEnhancedCertificatesDisable)

    cli.action.start(`Disabling Enhanced Certificates Beta on ${args.addon}`)
    try {
      await this.shogun.put(`/client/v11/enhanced_certificates/${args.addon}/disable`,
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
