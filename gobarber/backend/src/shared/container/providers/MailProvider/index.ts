import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import GoogleSMTPMailProvider from './implementations/GoogleSMTPMailProvider';

let provider = {} as IMailProvider;

if (mailConfig.driver === 'ethereal') {
  provider = container.resolve(EtherealMailProvider);
}

if (mailConfig.driver === 'googleSmtp') {
  provider = container.resolve(GoogleSMTPMailProvider);
}

container.registerInstance<IMailProvider>('MailProvider', provider);
