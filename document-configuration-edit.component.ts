import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder} from "@angular/forms";
import {DocumentConfigurationsService} from "../document-configurations/document-configurations.service";
import {DocumentConfiguration, DocumentUsage} from "../Models/document-configuration";
import {Document} from "../Models/document";
import {HttpClient} from "@angular/common/http";
import {DocumentsService} from "../documents/documents.service";
import {DocumentUsageType} from "../Models/document-usage-type";


@Component({
  selector: 'app-document-configuration-edit',
  templateUrl: './document-configuration-edit.component.html',
  styleUrls: ['./document-configuration-edit.component.scss']
})
export class DocumentConfigurationEditComponent implements OnInit{

  documents?: Document[];

  id!: number;

  documentConfigurationForm = this.formBuilder.group({
    id: undefined,
    name: '',
    default_configuration: false,
    documentUsages: this.formBuilder.array([]),
  })

  constructor(private documentConfigurationService: DocumentConfigurationsService,
              private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
              private documentService: DocumentsService,
              private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.documentConfigurationService.getConfigurationById(this.id).subscribe(data => {
        this.updateForm(data);
      });
    } else {
      this.updateForm({
        name: '',
        defaultConfiguration: false,
        documentUsages: this.usageTypeNames().map(type => ({type}))
      });
    }
    this.documentService.loadAll().
    subscribe(data => {
      this.documents = data;
    });
  }

  get documentUsages() {
    return this.documentConfigurationForm.controls["documentUsages"] as FormArray;
  }

  updateForm(data: DocumentConfiguration) {
    this.documentConfigurationForm.patchValue({
      id: data.id,
      name: data.name,
      default_configuration: data.defaultConfiguration,
    });

    data.documentUsages?.map(d => this.formBuilder.group({
      type: d.type,
      documentId: d.documentId,
      documentName: d.documentName
    })).forEach(d => this.documentUsages.push(d));

    console.log(this.documentUsages)
  }

  goToConfigurations(){
    this.router.navigateByUrl('configurations');
  }

  onSubmit(){
    const documentConfiguration: DocumentConfiguration = {
      id: this.documentConfigurationForm.get('id')!.value! as number,
      name: this.documentConfigurationForm.get('name')!.value!,
      defaultConfiguration: this.documentConfigurationForm.get('default_configuration')!.value!,
      documentUsages: this.documentConfigurationForm.get('documentUsages')!.value as DocumentUsage[]
    }

    if (this.id) {
      this.documentConfigurationService.update(this.id, documentConfiguration).subscribe(data => {
        this.goToConfigurations();
      });
    } else {
      this.documentConfigurationService.add(documentConfiguration).subscribe(data => {
        this.goToConfigurations();
      });
    }
  }
  usageTypeNames() {
    return [DocumentUsageType.INTRODUCTION, DocumentUsageType.COMMUNICATION_GUIDELINES,
            DocumentUsageType.REDUCTION_GUIDELINES, DocumentUsageType.TARGET_DEFINITION_GUIDELINES,
            DocumentUsageType.DATA_GATHER_GUIDELINES, DocumentUsageType.SCOPE_3_GUIDELINES]
  }
}
