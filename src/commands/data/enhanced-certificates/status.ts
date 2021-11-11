import {flags} from '@heroku-cli/command'
import color from '@heroku-cli/color'
import cli from 'cli-ux'

import BaseCommand, {EnhancedCertificate} from '../../../lib/base'

export default class DataEnhancedCertificatesStatus extends BaseCommand {
  static description = 'Get the status of Enhanced Certificates\nRead more about this feature at https://devcenter.heroku.com/articles/heroku-data-enhanced-certificates'

  static flags = {
    json: flags.boolean({description: 'Return the results as JSON'}),
  }

  static args = [{name: 'addon'}]

  async run() {
    const {args, flags} = this.parse(DataEnhancedCertificatesStatus)

    const addon = args.addon
    const {body: res} = await this.shogun.get<EnhancedCertificate>(
      `/client/v11/enhanced_certificates/${args.addon}/status`,
      this.shogun.defaults
    )

    if (flags.json) {
      cli.styledJSON(res)
      return
    }

    cli.styledHeader(`Enhanced Certificates for ${color.cyan(addon)}.`)
    cli.styledObject({
      Status: res.status,
    })
  }
}
