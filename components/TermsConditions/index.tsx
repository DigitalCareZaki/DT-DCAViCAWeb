'use server';

import Header from '../Auth/Header';

export default async function TermsConditions(): Promise<JSX.Element> {
  return (
    <div className="flex h-full w-full flex-col p-8 text-black">
      <Header />
      <div className="flex w-full flex-col gap-8 text-xs">
        <div className="flex flex-col gap-6">
          <span className="font-bold text-secondary">
            TERMS OF SERVICE AGREEMENT
          </span>
          <p className="text-justify">
            Please read the following terms of service agreement carefully. By
            accessing or using our sites and our services, you hereby agree to
            be bound by the terms and all terms incorporated herein by
            reference. It is the responsibility of you, the user, customer or
            prospective customer to read the terms and conditions before
            proceeding to use this site. If you do not expressly agree to all of
            the terms and conditions, then please do not access or use our sites
            or our services. This terms of service agreement is effective as of
            08/15/2017.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold text-secondary">ACCEPTANCE OF TERMS</span>
          <p className="text-justify">
            The following terms of service agreement{`(the "TOS")`} is a legally
            binding agreement that shall govern the relationship with our users
            and others which may interact or interface with TELENETDOCTORTM,
            including ETS platform, LLC, located at 300 Sevilla avenue S310,
            coral gables, Florida 33134 and its subsidiaries, associates,
            providers and affiliates here in after referred to as ETSP, in
            association with the use of the TELENETDOCTORTM site,{' '}
            {`(the "Site")`} and services as provided by ETSP, which shall be
            defined below.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold text-secondary">
            DESCRIPTION OF WEBSITE SERVICES OFFERED
          </span>
          <p className="text-justify">
            The site provides information and services related to telemedicine
            and patient monitoring and wellness Any and all visitors to our site
            shall be deemed as {`"Users"`} Of the herein contained services
            provided for the purpose of this TOS. <br /> The user acknowledges
            and agrees that the services provided and made available through our
            website and applications, which may include some mobile
            applications, are the sole property of ETSP. At its discretion, ETSP
            may offer additional website services and/or products, or update,
            modify or revise any current content and services, and this
            agreement shall apply to any and all additional services and/or
            products and any and all updated, modified or revised services
            unless otherwise stipulated. ETSP does hereby reserve the right to
            cancel and cease offering any of the aforementioned services and/or
            products. You, as the end user acknowledge, accept and agree that
            ETSP shall not be held liable for any such updates, modifications,
            revisions suspensions or discontinuance of any of our services
            and/or products. Your continued use of the services provided, after
            such posting of any updates, changes, and/or modifications shall
            constitute your acceptance of such updates, changes and/or
            modifications, and as such, frequent review of this agreement and
            any and all applicable terms and policies should be made by you to
            ensure you are aware of all terms and policies currently in effect.
            Should you not agree to the updated, revised or Modified terms, you
            must stop using the provided services forthwith. Furthermore ,the
            user understands, acknowledges and agrees that the services offered
            shall be provided {`"As is"`} and as such ETSP shall not assume any
            responsibility or obligation for the timeliness, missed delivery,
            deletion and/or any failure to store user content, communication or
            personalization settings.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold text-secondary">
            CAUTIONS FOR GLOBAL USEAND EXPORT AND IMPORT COMPLIANCE
          </span>
          <p>
            Due to the global nature of the internet, through the use of our
            network you here by agree to comply with all local rules relating to
            online conduct and that which is considered acceptable content.
            Uploading, posting and/or transferring of software, technology and
            other technical data may be subject to the export and import laws of
            the United States and possibly other countries. Through the use of
            our network, you thus agree to comply with all applicable export and
            import laws, statutes and regulations, including, but not limited
            to...
          </p>
        </div>
      </div>
    </div>
  );
}
