import { ANALYTICS_ACCEPTED } from "layout/layout/layout-app/constants";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DEBUG as GA_DEBUG, GA_TRACKING_ID } from "utils/gtag";

const Analytics = () => {
  const [includeAnalytics, setIncludeAnalytics] = useState(
    typeof window !== "undefined" ? localStorage.getItem(ANALYTICS_ACCEPTED) === "true" : false
  );

  useEffect(() => {
    window.addEventListener("storage", () => {
      const allow = localStorage.getItem(ANALYTICS_ACCEPTED) === "true";
      setIncludeAnalytics(allow);
    });
  }, []);

  useEffect(() => {
    const deleteAllCookies = () => {
      let cookies = document.cookie.split("; ");
      for (let c = 0; c < cookies.length; c++) {
        let d = window.location.hostname.split(".");
        while (d.length > 0) {
          let cookieBase =
            encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
            "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
            d.join(".") +
            " ;path=";
          let p = location.pathname.split("/");
          document.cookie = cookieBase + "/";
          while (p.length > 0) {
            document.cookie = cookieBase + p.join("/");
            p.pop();
          }
          d.shift();
        }
      }
    };
    if (!includeAnalytics) {
      deleteAllCookies();
    }
  }, [includeAnalytics]);

  return (
    <Head>
      {/* Google Tag Manager - "Essential" */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GA_TRACKING_ID}');`
        }}
      />

      {/* Twitter universal / pixel website tag code */}
      {(GA_DEBUG || includeAnalytics) && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
              // Insert Twitter Pixel ID and Standard Event data below
              twq('init','o6zz1');
              twq('track','PageView');`
            }}
          />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `twq('event', 'tw-o6zz1-oe4ku', {});` }} />
        </>
      )}
      {/* End Twitter universal / pixel website tag code */}

      {/* ------ HOTJAR TRACKING CODE ------ */}
      {(GA_DEBUG || includeAnalytics) && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2159027,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
          }}
        />
      )}
      {/* ------ CRAZY EGG ------ */}
      {(GA_DEBUG || includeAnalytics) && (
        <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0069/4623.js" async />
      )}
    </Head>
  );
};

export default Analytics;
