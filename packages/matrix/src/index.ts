export class Matrix {
  constructor(
    public a: number = 1,
    public b: number = 0,
    public c: number = 0,
    public d: number = 1,
    public e: number = 0,
    public f: number = 0
  ) {}

  multiply(other: Matrix): Matrix {
    return new Matrix(
      this.a * other.a + this.b * other.c,
      this.a * other.b + this.b * other.d,
      this.c * other.a + this.d * other.c,
      this.c * other.b + this.d * other.d,
      this.e * other.a + this.f * other.c + other.e,
      this.e * other.b + this.f * other.d + other.f
    );
  }

  translate(x: number, y: number): Matrix {
    return this.multiply(new Matrix(1, 0, 0, 1, x, y));
  }

  scale(sx: number, sy: number = sx): Matrix {
    return this.multiply(new Matrix(sx, 0, 0, sy, 0, 0));
  }

  rotate(angle: number): Matrix {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return this.multiply(new Matrix(cos, sin, -sin, cos, 0, 0));
  }

  toArray(): [number, number, number, number, number, number] {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
}

export default Matrix;