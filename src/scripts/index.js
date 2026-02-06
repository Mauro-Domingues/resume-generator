import { Navigation } from './navigation.js?v=1.0.0';
import { Header } from './header.js?v=1.0.0';
import { Skills } from './skills.js?v=1.0.0';
import { Experience } from './experience.js?v=1.0.0';
import { Graduation } from './graduation.js?v=1.0.0';
import { Project } from './projects.js?v=1.0.0';
import { Specialization } from './specialization.js?v=1.0.0';
import { KeywordManager } from './keyword-manager.js?v=1.0.0';
import { Description } from './description.js?v=1.0.0';
import { FormActions } from './form-actions.js?v=1.0.0';
import { IframeScaler } from './iframe-scaler.js?v=1.0.0';
import { PersistenceManager } from './persistence.js?v=1.0.0';

class Main {
  constructor() {
    this.#initializeComponents();
    this.#setupKeywordManagers();
    this.#setupPersistence();
    this.#setupFormActions();
    this.iframeScaler = new IframeScaler();
  }

  #initializeComponents() {
    this.navigation = new Navigation();
    this.header = new Header();
    this.skills = new Skills();
    this.experience = new Experience();
    this.graduation = new Graduation();
    this.project = new Project();
    this.specialization = new Specialization();
    this.description = new Description();
  }

  #setupKeywordManagers() {
    KeywordManager.setupKeywordContainer('skillsKeywords', 'skillsKeywordsAdd');
    KeywordManager.setupKeywordContainer('aboutKeywords', 'aboutKeywordsAdd');
    KeywordManager.setupKeywordContainer('targetKeywords', 'targetKeywordsAdd');
  }

  #setupFormActions() {
    const sectionManagers = {
      header: this.header,
      skills: this.skills,
      experience: this.experience,
      graduation: this.graduation,
      project: this.project,
      specialization: this.specialization,
      description: this.description,
      keywordManager: KeywordManager,
    };

    new FormActions(sectionManagers).setupAllActions();
  }

  #setupPersistence() {
    const params = new URLSearchParams(globalThis.location.search);
    const example = params.get('example');

    PersistenceManager.persistenceState = example;
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());
