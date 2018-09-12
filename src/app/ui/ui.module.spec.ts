import { DashboardUiModule } from './ui.module';

describe('UiModule', () => {
  let uiModule: DashboardUiModule;

  beforeEach(() => {
    uiModule = new DashboardUiModule();
  });

  it('should create an instance', () => {
    expect(uiModule).toBeTruthy();
  });
});
