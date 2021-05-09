import React from 'react';
import './copy-alert.scss';

const { CdsAlert, CdsAlertGroup } =
  typeof window !== `undefined`
    ? require('@cds/react/alert')
    : { CdsAlert: null, CdsAlertGroup: null };

export function CopyAlert({ hideAlertFunc }: { hideAlertFunc: () => void }) {
  if (typeof window === `undefined`) {
    return <div></div>;
  }

  return (
    <div className="copy-alert__wrapper">
      <CdsAlertGroup
        status="success"
        aria-label="The code snipped is copied to the clipboard alert message."
      >
        <CdsAlert closable={true} onCloseChange={hideAlertFunc}>
          <span cds-text="section"> Copied to clipboard</span>
        </CdsAlert>
      </CdsAlertGroup>
    </div>
  );
}
