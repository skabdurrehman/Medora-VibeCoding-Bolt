// Supabase client configuration
// Note: In a real app, you would set up actual Supabase credentials

interface SupabaseResponse<T> {
  data: T | null;
  error: any;
}

class MockSupabaseClient {
  private mockData: { [key: string]: any[] } = {
    donation_requests: [],
    donation_matches: [],
    health_files: []
  };

  from(table: string) {
    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: any) => ({
            limit: (count: number) => this.mockSelect(table, { eq: { column, value }, limit: count })
          }),
          single: () => this.mockSelect(table, { eq: { column, value }, single: true })
        }),
        order: (column: string, options?: any) => ({
          limit: (count: number) => this.mockSelect(table, { limit: count })
        }),
        limit: (count: number) => this.mockSelect(table, { limit: count })
      }),
      insert: (data: any[]) => this.mockInsert(table, data),
      update: (data: any) => ({
        eq: (column: string, value: any) => this.mockUpdate(table, data, { column, value })
      }),
      delete: () => ({
        eq: (column: string, value: any) => this.mockDelete(table, { column, value })
      })
    };
  }

  storage = {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => this.mockUpload(bucket, path, file),
      getPublicUrl: (path: string) => ({
        data: { publicUrl: `https://mock-storage.supabase.co/${bucket}/${path}` }
      })
    })
  };

  private async mockSelect(table: string, options: any = {}): Promise<SupabaseResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = this.mockData[table] || [];
        
        if (options.eq) {
          data = data.filter(item => item[options.eq.column] === options.eq.value);
        }
        
        if (options.limit) {
          data = data.slice(0, options.limit);
        }
        
        if (options.single) {
          data = data[0] || null;
        }
        
        resolve({ data, error: null });
      }, 300);
    });
  }

  private async mockInsert(table: string, data: any[]): Promise<SupabaseResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = data.map(item => ({
          ...item,
          id: Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString()
        }));
        
        if (!this.mockData[table]) {
          this.mockData[table] = [];
        }
        
        this.mockData[table].unshift(...newItems);
        resolve({ data: newItems, error: null });
      }, 500);
    });
  }

  private async mockUpdate(table: string, data: any, where: any): Promise<SupabaseResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.mockData[table]) {
          const index = this.mockData[table].findIndex(item => item[where.column] === where.value);
          if (index !== -1) {
            this.mockData[table][index] = { ...this.mockData[table][index], ...data };
          }
        }
        resolve({ data: null, error: null });
      }, 300);
    });
  }

  private async mockDelete(table: string, where: any): Promise<SupabaseResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.mockData[table]) {
          this.mockData[table] = this.mockData[table].filter(item => item[where.column] !== where.value);
        }
        resolve({ data: null, error: null });
      }, 300);
    });
  }

  private async mockUpload(bucket: string, path: string, file: File): Promise<SupabaseResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful upload
        resolve({ data: { path }, error: null });
      }, 1000);
    });
  }
}

// Export mock client for development
export const supabase = new MockSupabaseClient();

// In a real app, you would use:
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'YOUR_SUPABASE_URL'
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
// export const supabase = createClient(supabaseUrl, supabaseKey)