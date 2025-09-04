export interface Model {
    id: number;
    model: string;
    products: string[];
}

export interface TinybirdResponse {
    meta: Array<{ name: string; type: string }>;
    data: Model[];
    rows: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ReportData {
    model_id: number;
    model_name: string;
    product: string;
    issue: string;
    purpose: string;
    location: string;
}

export interface IssueBreakdown {
    issue: string;
    count: number;
}

export interface ReportSummary {
    model_id?: string;
    model_name?: string;
    product?: string;
    issue?: string;
    total_reports: number;
    unique_sessions?: number;
    hallucinations?: number;
    biases?: number;
    wrong_outputs?: number;
    unsafes?: number;
    overconfidences?: number;
    model_not_responding?: number;
    issue_breakdown?: IssueBreakdown[];
    products?: string[];
    purposes?: string[];
}

export interface ReportsByModelResponse {
    meta: Array<{ name: string; type: string }>;
    data: ReportSummary[];
    rows: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ReportsByProductResponse {
    meta: Array<{ name: string; type: string }>;
    data: ReportSummary[];
    rows: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ReportsByIssueResponse {
    meta: Array<{ name: string; type: string }>;
    data: ReportSummary[];
    rows: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ModelProductStatusData {
    product: string;
    is_above_average: number;
}

export interface ReportsByModelProductStatusResponse {
    meta: Array<{ name: string; type: string }>;
    data: ModelProductStatusData[];
    rows: number;
    rows_before_limit_at_least: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ReportsByModelProductResponse {
    meta: Array<{ name: string; type: string }>;
    data: ReportSummary[];
    rows: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface DailySummaryData {
    day_start: string;
    model_id: string;
    model_name: string;
    product: string;
    issue: string;
    report_count: number;
}

export interface ReportsDailySummaryResponse {
    meta: Array<{ name: string; type: string }>;
    data: DailySummaryData[];
    rows: number;
    rows_before_limit_at_least: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}

export interface ProductWeekData {
    product: string;
    hourly_counts: number[];
}

export interface ReportsModelProductWeekResponse {
    meta: Array<{ name: string; type: string }>;
    data: ProductWeekData[];
    rows: number;
    rows_before_limit_at_least: number;
    statistics: {
        elapsed: number;
        rows_read: number;
        bytes_read: number;
    };
}
