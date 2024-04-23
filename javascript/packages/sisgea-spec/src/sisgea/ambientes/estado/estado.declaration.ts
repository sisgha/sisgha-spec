import { IPaginatedResultDto, ObjectUuidDeclarationFactory, PaginatedResultDtoDeclarationFactoryBuilder } from '@/core';
import * as SpecHelpers from '@/helpers';

// ======================================

export type IEstadoModel = {
  id: number;
  nome: string;
  sigla: string;
};

export type IEstadoFindOneByIdInputDto = Pick<IEstadoModel, 'id'>;
export type IEstadoFindOneByUfInputDto = { uf: IEstadoModel['sigla'] };

export type IEstadoFindOneResultDto = {
  id: IEstadoModel['id'];
  nome: IEstadoModel['nome'];
  sigla: IEstadoModel['sigla'];
};

export type IEstadoFindAllResultDto = IPaginatedResultDto<IEstadoFindOneResultDto>;

// ======================================

export const EstadoDeclarationFactory = SpecHelpers.DeclareEntity(() => {
  return {
    name: 'Estado',

    properties: {
      //
      id: {
        nullable: false,
        type: SpecHelpers.PropertyTypes.INTEGER,
        description: 'ID IBGE do Estado.',
      },
      //

      nome: {
        nullable: false,
        type: SpecHelpers.PropertyTypes.STRING,
        description: 'Nome oficial do Estado.',
      },

      sigla: {
        nullable: false,
        type: SpecHelpers.PropertyTypes.STRING,
        description: 'Sigla UF oficial do Estado.',
      },
    },
  };
});

export const EstadoFindOneByIdInputDeclaration = ObjectUuidDeclarationFactory;

export const EstadoFindOneByUfInputDeclaration = SpecHelpers.DeclareEntity(() => {
  const { properties } = SpecHelpers.GetDeclaration(EstadoDeclarationFactory);

  return {
    name: 'EstadoFindOneByUfInput',

    properties: {
      uf: properties.sigla,
    },
  };
});

export const EstadoFindOneResultDeclaration = SpecHelpers.DeclareEntity(() => {
  const { properties } = SpecHelpers.GetDeclaration(EstadoDeclarationFactory);

  return {
    name: 'EstadoFindOneResult',
    partialOf: EstadoDeclarationFactory,

    properties: {
      //
      id: properties.id,
      //
      nome: properties.nome,
      sigla: properties.sigla,
      //
    },
  };
});

// ======================================

export const EstadoFindAllResultDeclaration = PaginatedResultDtoDeclarationFactoryBuilder(
  EstadoFindOneResultDeclaration,
  'EstadoFindAllResult',
);

// ======================================
