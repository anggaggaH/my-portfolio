'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-51HCY01QZ4';

export default function Analytics() {
	return (
		<>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy='afterInteractive' />
			<Script id='ga-init' strategy='afterInteractive'>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
			</Script>
		</>
	);
}
