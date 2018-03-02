import { Step } from './step.model';

export class Workflow {
    id: number;
    version: number;
    steps: Step[];
    active: boolean;
}