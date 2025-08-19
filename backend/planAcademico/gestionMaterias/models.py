from django.db import models

class Materia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

class Plan(models.Model):

    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='planes')

    CONDICION_CHOICES = [
        ('APROBADA', 'Aprobada'),
        ('APROBADA LIBRE', 'Aprobada Libre'),
        ('PROMOCION', 'Promoción'),
        ('REGULAR', 'Regular'),
        ('INSCRIPTO', 'Inscripto'),
        ('NO_INSCRITO', 'No Inscripto'),
    ]
    condicion = models.CharField(max_length=15, choices=CONDICION_CHOICES)

    TIPO_CHOICES = [
        ('ANUAL', 'Anual'),
        ('CUATRIMESTRAL', 'Cuatrimestral'),
    ]
    tipo = models.CharField(max_length=15, choices=TIPO_CHOICES)

    ausencias = models.IntegerField(default=0)
    nota_final = models.IntegerField(null=True, blank=True)
    observaciones = models.TextField(blank=True, null=True)

class IntentoRendir(models.Model):
    MESA_CHOICES = [
        ('FEBRERO', 'Febrero'),
        ('MARZO', 'Marzo'),
        ('MAYO', 'Mayo'),
        ('JULIO', 'Julio'),
        ('SEPTIEMBRE', 'Septiembre'),
        ('NOVIEMBRE', 'Noviembre'),
        ('DICIEMBRE', 'Diciembre'),
    ]

    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='intentos')
    intento_num = models.PositiveSmallIntegerField()
    anio = models.PositiveIntegerField()  # Año del intento (por ejemplo, 2025)
    mesa = models.CharField(max_length=15, choices=MESA_CHOICES)
    fecha = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.materia.nombre} - {self.mesa} {self.anio} - Intento {self.intento_num}'

class Correlativa(models.Model):
    TIPO_CHOICES = [
        ('D', 'D'), 
        ('F', 'F'),    
    ]

    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='correlativas_de')
    correlativa = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name='correlativas_para')
    tipo = models.CharField(max_length=1, choices=TIPO_CHOICES)

    def __str__(self):
        return f"{self.correlativa.nombre} es correlativa de {self.materia.nombre} ({self.get_tipo_display()})"
