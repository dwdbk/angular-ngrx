import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {AppState} from "../../reducers";
import {Matiere} from "../../interfaces/matieres.interface";
import {MatiereListModule} from "../../actions/matiere.action";

@Component({
  selector: 'app-ajout-matiere',
  templateUrl: './ajout-matiere.component.html',
  styleUrls: ['./ajout-matiere.component.scss']
})
export class AjoutMatiereComponent implements OnInit {

  public matiereForm: FormGroup;

  constructor(private router: Router, @Inject(FormBuilder) fb: FormBuilder, private store: Store<AppState>) {
    this.matiereForm = fb.group({
      libelle: ['', Validators.required],
      coefficient: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createMatiere(data: Matiere) {
    const payload = {
      ...data
    };
    this.store.dispatch(new MatiereListModule.LoadCreateMatiere(payload));
    // this.matiereForm.reset();
    this.router.navigateByUrl('/matiere');
  }

}
