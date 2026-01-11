import { Navigation } from './navigation.js';
import { Header } from './header.js';
import { Skills } from './skills.js';
import { Experience } from './experience.js';
import { Graduation } from './graduation.js';
import { Project } from './projects.js';
import { Specialization } from './specialization.js';
import { KeywordManager } from './keyword-manager.js';
import { Description } from './description.js';
import { FormActions } from './form-actions.js';

class Main {
  constructor() {
    new Navigation();
    new Header();
    new Skills();
    new Experience();
    new Graduation();
    new Project();
    new Specialization();
    new Description()

    KeywordManager.setupKeywordContainer('skillsKeywords', 'skillsKeywordsAdd');
    KeywordManager.setupKeywordContainer('aboutKeywords', 'aboutKeywordsAdd');
    KeywordManager.setupKeywordContainer('targetKeywords', 'targetKeywordsAdd');

    FormActions.setupAllActions();
  }
}

document.addEventListener('DOMContentLoaded', () => new Main());