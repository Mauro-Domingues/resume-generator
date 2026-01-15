export class PersistenceManager {
    static #STORAGE_KEY = 'resume_generator_state';

    static save(data) {
        try {
            localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    static load() {
        try {
            const saved = localStorage.getItem(this.#STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return null;
        }
    }

    static clear() {
        try {
            localStorage.removeItem(this.#STORAGE_KEY);
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
        }
    }
}
