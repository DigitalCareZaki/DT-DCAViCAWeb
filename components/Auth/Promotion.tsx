import Link from 'next/link';
import { ButtonPromotion } from '@common';

export default function Promotion(): JSX.Element {
  return (
    <>
      <Link passHref href="/technical-support">
        <h3 className="cursor-pointer font-normal tracking-wider text-secondary underline">
          Need help signing in? Get Technical Support.
        </h3>
      </Link>
      <div className="flex w-full justify-around">
        <Link
          passHref
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className="cursor-pointer text-sm font-normal tracking-wider text-secondary underline">
            Privacy Policy
          </h4>
        </Link>
        <Link
          passHref
          href="/terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 className="cursor-pointer text-sm font-normal tracking-wider text-secondary underline">
            Terms & Conditions
          </h4>
        </Link>
      </div>

      <div className="flex w-full flex-col items-center font-normal tracking-wider">
        <span className="text-sm font-normal tracking-wider text-secondary">Available on</span>
        <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
          <Link passHref href="#" target="_blank" rel="noopener noreferrer">
            <ButtonPromotion
              heading="AppStore"
              name="Download Staff App"
              iconName="FaApple"
            />
          </Link>
          <Link passHref href="https://play.google.com/store/apps/details?id=com.AvicaPatient&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
            <ButtonPromotion
              heading="Google Play"
              name="GET Patient App"
              iconName="BiLogoPlayStore"
            />
          </Link>
          <Link passHref href="#" target="_blank" rel="noopener noreferrer">
            <ButtonPromotion
              heading="AppStore"
              name="Download Patient App"
              iconName="FaApple"
            />
          </Link>
          <Link passHref href="https://play.google.com/store/apps/details?id=com.optimum.AvicaStaff&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
            <ButtonPromotion
              heading="Google Play"
              name="GET Staff App"
              iconName="BiLogoPlayStore"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
