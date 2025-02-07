import { Injectable } from '@angular/core';

/**
 * Questo servizio mantiene un "registro" (mappa) delle istanze
 * dei componenti figli per consentire al padre di chiamarne
 * il metodo `salva()` da un unico punto.
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // Mappa: identificatoreTab -> istanza del componente
  private componentsMap = new Map<string, any>();

  /**
   * Registra una tab: salva nel registro l'istanza del componente.
   * @param tabId Identificatore univoco per la tab (es. "informazioniCliente")
   * @param component L'istanza concreta del componente (this)
   * 
   */
  private isCacheEnabled: boolean = false;

  setCacheEnabled(isEnabled: boolean): void {
    this.isCacheEnabled = isEnabled;
  }
  
  getCacheEnabled(): boolean {
    return this.isCacheEnabled;
  }

  
  registerComponent(tabId: string, component: any): void {
    this.componentsMap.set(tabId, component);
  }

  /**
   * Rimuove la tab dal registro (se il componente viene distrutto).
   */
  unregisterComponent(tabId: string): void {
    this.componentsMap.delete(tabId);
  }

  /**
   * Richiama il metodo `salva()` di tutti i componenti registrati.
   * Se un componente non implementa `salva()`, viene ignorato.
   */
  saveAllTabs(): boolean{
    if(this.isCacheEnabled){
      this.componentsMap.forEach((componentInstance, tabId) => {
        if (componentInstance && typeof componentInstance.salva === 'function') {
          console.log(`Eseguo salva() sulla tab: ${tabId}`);
          componentInstance.salva();
        }
      });
      return true;
    }else{
      alert("Numero di Partita Iva non valido");
      return false; 
    }
  }

  
}
