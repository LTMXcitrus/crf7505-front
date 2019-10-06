import {Pipe, PipeTransform} from '@angular/core';
import {RoleType} from "./model/RoleType";

@Pipe({
  name: 'translateRole'
})
export class TranslateRolePipe implements PipeTransform {

  transform(role: RoleType, args?: any): any {
    return this.translateRole(role);
  }

  private translateRole(role: RoleType) {
    if (role === RoleType.PSC1) {
      return "PSC1";
    }
    if (role === RoleType.PSE1) {
      return "PSE1";
    }
    if (role === RoleType.PSE2) {
      return "PSE2";
    }
    if (role === RoleType.PSE1_CYCLISTE) {
      return "PSE1 Cycliste";
    }
    if (role === RoleType.PSE2_CYCLISTE) {
      return "PSE2 Cycliste";
    }
    if (role === RoleType.PSE1_CAVALIER) {
      return "PSE1 Cavalier";
    }
    if (role === RoleType.PSE2_CAVALIER) {
      return "PSE2 Cavalier";
    }
    if (role === RoleType.CI) {
      return "CI";
    }
    if (role === RoleType.CDP) {
      return "CI (Chef de Poste)";
    }
    if (role === RoleType.CHEF_SECTEUR) {
      return "Chef de Secteur";
    }
    if (role === RoleType.CDPMGE) {
      return "Chef de Poste Moyenne et Grande Envergure";
    }
    if (role === RoleType.CI_BSPP) {
      return "CI BSPP";
    }
    if (role === RoleType.CI_ALPHA) {
      return "CI Alpha";
    }
    if (role === RoleType.CH_VPSP) {
      return "Chauffeur";
    }
    if (role === RoleType.CH_VL) {
      return "Chauffeur VL";
    }
    if (role === RoleType.CH_QUAD) {
      return "Chauffeur Quad";
    }
    if (role === RoleType.INFIRMIER) {
      return "Infirmier";
    }
    if (role === RoleType.MEDECIN) {
      return "Médecin";
    }
    if (role === RoleType.DLUS) {
      return "DLUS";
    }
    if (role === RoleType.REGULATEUR) {
      return "Régulateur";
    }
    if (role === RoleType.REGULATEUR_TERRAIN) {
      return "Régulateur Terrain";
    }
    if (role === RoleType.AIDE_REGULATEUR) {
      return "Aide Régulateur";
    }
    if (role === RoleType.LOGISTICIEN) {
      return "Logisticien";
    }
    if (role === RoleType.ONYX) {
      return "Onyx";
    }
    if (role === RoleType.PARTICIPANT) {
      return "Participant";
    }
    if (role === RoleType.PARTICIPANT_EXT) {
      return "Participant Extérieur";
    }
  }


}
