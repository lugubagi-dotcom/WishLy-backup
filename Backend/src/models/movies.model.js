// src/models/plan.model.js
import { prisma } from "../lib/prisma.js";

export async function listarFilmes() {
  return prisma.movie.findMany({ orderBy: { title: "asc" } });
}

export async function buscarFilmePorId(id) {
  return prisma.movie.findUnique({ where: { id } });
}

export async function criarFilme(data) {
  return prisma.movie.create({ data });
}

export async function atualizarFilme(id, data) {
  return prisma.movie.update({ where: { id }, data });
}

export async function deletarFilme(id) {
  return prisma.movie.delete({ where: { id } });
}