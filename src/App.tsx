import { PlanProvider } from './state/plan';
import { CourseProvider } from './state/course';
import { HoverProvider } from './state/active';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { TabBar } from './components/TabBar';
import { DistanceChoice } from './components/DistanceChoice';
import { TempoPlan } from './components/TempoPlan';
import { ElevationProfile } from './components/ElevationProfile';
import { Splits, Wristband } from './components/Splits';
import { MilePage } from './components/MilePage';
import { CourseMap } from './components/CourseMap';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { usePlan } from './state/plan';

function Shell() {
  const { state } = usePlan();
  const page = state.view === 'om' || state.view === 'kontakt' || state.view === 'personvern';
  return (
    <>
      <a className="skip" href="#innhold">
        Hopp til innhold
      </a>
      <TopNav />
      {!page && <Hero />}
      <main id="innhold">
        {state.view === 'om' ? (
          <AboutPage />
        ) : state.view === 'kontakt' ? (
          <ContactPage />
        ) : state.view === 'personvern' ? (
          <PrivacyPage />
        ) : (
          <>
            <TabBar />
            <div className="wrap panels">
              {state.view === 'distanse' && <DistanceChoice />}
              {state.view === 'plan' && <TempoPlan />}
              {state.view === 'profil' && <ElevationProfile />}
              {state.view === 'splits' && <Splits />}
              {state.view === 'mile' && <MilePage />}
              {state.view === 'band' && <Wristband />}
            </div>
            {state.view === 'profil' && <CourseMap />}
          </>
        )}
        <Footer />
      </main>
    </>
  );
}

export function App() {
  return (
    <PlanProvider>
      <CourseProvider>
        <HoverProvider>
          <Shell />
        </HoverProvider>
      </CourseProvider>
    </PlanProvider>
  );
}
