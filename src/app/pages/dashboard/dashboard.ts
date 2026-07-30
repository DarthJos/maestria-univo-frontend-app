import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Indicador de carga
import { AiService } from '../../services/ai';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {
  textoUsuario: string = '';
  respuestaIA: string = '';
  cargando: boolean = false; // Indicador de carga

  constructor(private aiService: AiService, private cdr: ChangeDetectorRef) {}

  enviarPregunta() {
    if(!this.textoUsuario.trim()) {
      return; // No enviar si el campo está vacío
    }

    this.cargando = true; // Mostrar indicador de carga
    this.respuestaIA = ''; // Limpiar la respuesta anterior
    
    this.aiService.consultarInteligenciaArtificial(this.textoUsuario).subscribe({
      next: (res) => {
        console.log("NEXT ejecutando...")
        this.respuestaIA = res.respuesta;
        this.cargando = false;

        this.cdr.detectChanges(); // Forzar la detección de cambios para actualizar la vista

        console.log("cargando =", this.cargando);
        console.log("respuestaIA =", this.respuestaIA);
      },
      error: (err) => {
        console.error('Error al consultar la IA:', err);
        this.respuestaIA = 'Ocurrió un error al procesar tu solicitud con el cerebro.';
        this.cargando = false;
      },
      complete: () => {
        console.log("COMPLETE")
      }
    });
  }
}
