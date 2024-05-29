import { U } from '@unispec/core';
import { PaginatedResultView } from '../../-shared';
import { Tokens } from '../../tokens';

export const EtapaEntity = U.ObjectEntity({
  id: 'uuid',
  dated: true,

  description: 'Etapa',

  properties: {
    numero: U.Integer({
      nullable: true,
      description: 'Número da etapa.',
    }),
    dataInicio: U.String({
      format: 'date',
      description: 'Data de início.',
    }),
    dataTermino: U.String({
      format: 'date',
      description: 'Data de término.',
    }),
    cor: U.String({
      nullable: true,
      description: 'Cor da etapa.',
    }),
    //
    calendario: U.Reference({
      nullable: true,
      description: 'Calendario.',
      targetsTo: Tokens.CalendarioLetivo.Entity,
    }),
  },
});

export const EtapaView = U.View({
  name: Tokens.Etapa.Entity,
  description: 'Visão completa de um Etapa.',

  type: U.ObjectTransformer.From(EtapaEntity)
    .Extends({
      properties: {
        calendario: {
          targetsTo: Tokens.CalendarioLetivo.Views.FindOneResult,
        },
      },
    })
    .Node(),
});

export const EtapaFindOneInputView = U.View({
  name: Tokens.Etapa.Views.FindOneInput,
  description: 'Dados de entrada para encontrar um Etapa por ID.',
  type: U.ObjectTransformer.From(EtapaView.type).Pick({ id: true }).Node(),
});

export const EtapaFindOneResultView = U.View({
  name: Tokens.Etapa.Views.FindOneResult,

  partialOf: Tokens.Etapa.Entity,
  description: 'Visão FindOne de um Etapa.',

  type: U.ObjectTransformer.From(EtapaView.type)
    .Pick({
      id: true,
      //
      numero: true,
      dataInicio: true,
      dataTermino: true,
      cor: true,
      //
      calendario: true,
      //
      dateCreated: true,
      dateUpdated: true,
      dateDeleted: true,
    })
    .Node(),
});

export const EtapaInputCreateView = U.View({
  name: Tokens.Etapa.Views.InputCreate,
  description: 'Dados de entrada para a criação de um Etapa.',

  type: U.ObjectTransformer.From(EtapaView.type)
    .Pick({
      numero: true,
      dataInicio: true,
      dataTermino: true,
      cor: true,
    })
    .Extends({
      properties: {
        calendario: {
          targetsTo: Tokens.CalendarioLetivo.Views.FindOneInput,
        },
      },
    })
    .Node(),
});

export const EtapaInputUpdateView = U.View({
  name: Tokens.Etapa.Views.InputUpdate,

  description: 'Dados de entrada para a atualização de um Etapa.',

  type: U.ObjectPartial(EtapaInputCreateView.type),
});

export const EtapaFindAllResult = PaginatedResultView({
  name: Tokens.Etapa.Views.FindAllResult,
  description: 'Realiza a busca a Etapas.',
  targetsTo: Tokens.Etapa.Views.FindOneResult,
});

export const EtapaDeclarator = U.Declarator({
  entity: Tokens.Etapa.Entity,

  operations: {
    crud: {
      findById: {
        name: Tokens.Etapa.Operations.FindById,
        input: Tokens.Etapa.Views.FindOneInput,
        output: Tokens.Etapa.Views.FindOneResult,
      },

      deleteById: {
        name: Tokens.Etapa.Operations.DeleteById,
      },
      create: {
        name: Tokens.Etapa.Operations.Create,
        input: Tokens.Etapa.Views.InputCreate,
      },
      updateById: {
        name: Tokens.Etapa.Operations.UpdateById,
        input: Tokens.Etapa.Views.InputUpdate,
      },

      list: {
        name: Tokens.Etapa.Operations.List,
        view: Tokens.Etapa.Views.FindAllResult,
        filters: [['calendario.id', ['$eq']]],
      },
    },
  },
});

export const EtapaProvider = U.Provider((ctx) => {
  ctx.Add(EtapaEntity);
  ctx.Add(EtapaView);
  ctx.Add(EtapaFindOneInputView);
  ctx.Add(EtapaFindOneResultView);
  ctx.Add(EtapaInputCreateView);
  ctx.Add(EtapaInputUpdateView);
  ctx.Add(EtapaFindAllResult);
  ctx.Add(EtapaDeclarator);
});
