import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../img/logo.jpg'; // Replace with actual image later

const AppWork = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="container my-5">
      {/* Language Switcher */}
      <div className="mb-4 text-end">
        <button onClick={() => changeLanguage('en')} className="btn btn-outline-primary btn-sm mx-1">EN</button>
        <button onClick={() => changeLanguage('hi')} className="btn btn-outline-success btn-sm mx-1">HI</button>
        <button onClick={() => changeLanguage('mr')} className="btn btn-outline-warning btn-sm mx-1">MR</button>
      </div>

      {/* Main Image and Intro */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img src={logo} alt="EcoBazar" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h1 className="text-primary">{t('title')}</h1>
          <h4 className="mt-3">{t('heading')}</h4>
          <p>{t('description')}</p>
          <p>{t('moreInfo')}</p>
        </div>
      </div>

      {/* How To Use Section */}
      <div className="card shadow p-4">
        <h3 className="text-success mb-3">{t('howToUse.title')}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{t('howToUse.step1')}</li>
          <li className="list-group-item">{t('howToUse.step2')}</li>
          <li className="list-group-item">{t('howToUse.step3')}</li>
          <li className="list-group-item">{t('howToUse.step4')}</li>
          <li className="list-group-item">{t('howToUse.step5')}</li>
          <li className="list-group-item">{t('howToUse.step6')}</li>
          <li className="list-group-item">{t('howToUse.step7')}</li>
          <li className="list-group-item">{t('howToUse.step8')}</li>
          <li className="list-group-item">{t('howToUse.step9')}</li>
          <li className="list-group-item">{t('howToUse.step10')}</li>
          <li className="list-group-item">{t('howToUse.step11')}</li>
          <li className="list-group-item">{t('howToUse.step12')}</li>
        </ul>
      </div>
    </div>
  );
};

export default AppWork;
