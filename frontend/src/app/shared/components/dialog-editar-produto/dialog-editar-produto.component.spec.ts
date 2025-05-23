import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarProdutoComponent } from './dialog-editar-produto.component';

describe('DialogEditarProdutoComponent', () => {
  let component: DialogEditarProdutoComponent;
  let fixture: ComponentFixture<DialogEditarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditarProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
